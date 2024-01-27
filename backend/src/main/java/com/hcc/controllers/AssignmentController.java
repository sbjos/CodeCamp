package com.hcc.controllers;

import com.hcc.dto.AssignmentResponseDto;
import com.hcc.entities.Assignment;
import com.hcc.entities.User;
import com.hcc.enums.AssignmentStatusEnum;
import com.hcc.enums.AuthorityEnum;
import com.hcc.exceptions.AssignmentNotFoundException;
import com.hcc.repositories.AssignmentRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
public class AssignmentController {

    Logger log = LogManager.getLogger(AssignmentController.class);

    @Autowired
    private AssignmentRepository assignmentRepository;

    /**
     * Gets all af a user's assignment.
     * @param user
     * @return HTTPStatus response with a list of assignments.
     * @throws AssignmentNotFoundException
     */
    @GetMapping(value = "/api/assignments")
    public ResponseEntity<List<AssignmentResponseDto>> getAssignmentsByUser(@AuthenticationPrincipal User user) {
        List<Assignment> assignmentsPage = null;

        if (user.getAuthorities().toString().contains(AuthorityEnum.LEARNER.name())) {
            assignmentsPage = assignmentRepository.findByUser(user);

        } else if (user.getAuthorities().toString().contains(AuthorityEnum.REVIEWER.name())) {
            assignmentsPage = assignmentRepository.findAll();
        }

        if (assignmentsPage.isEmpty()) return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        List<AssignmentResponseDto> assignmentDTO = assignmentsPage.stream()
                .map(AssignmentResponseDto::new)
                .collect(Collectors.toList());

        return new ResponseEntity<>(assignmentDTO, HttpStatus.OK);
    }

    /**
     * Gets an assignment by ID.
     * @param assignmentId
     * @param user
     * @return HTTPStatus response with assignment.
     * @throws AssignmentNotFoundException
     */
    @GetMapping(value = "/api/assignments/{id}")
    public ResponseEntity<AssignmentResponseDto> getAssignmentById(@PathVariable("id") Long assignmentId,
                                                                   @AuthenticationPrincipal User user) {
        AssignmentResponseDto assignmentDTO = new AssignmentResponseDto(assignmentLookup(assignmentId, user)
                .orElse(new Assignment())
        );

        return new ResponseEntity<>(assignmentDTO, HttpStatus.OK);
    }

    /**
     * Modifies an existing assignment.
     * @param assignmentId
     * @param user
     * @return HTTPStatus response with the modified assignment.
     * @throws AssignmentNotFoundException
     */
    @PutMapping(value = "/api/assignments/{id}")
    public ResponseEntity<AssignmentResponseDto> updateAssignmentById(@PathVariable("id") Long assignmentId,
                                                                      @RequestBody Assignment update,
                                                                      @AuthenticationPrincipal User user) {
        Optional<Assignment> assignment;
        GrantedAuthority userAuthority = user.getAuthorities().stream().findFirst().get();

        if (userAuthority.toString().equals(AuthorityEnum.REVIEWER.name())) {
            assignment = assignmentLookup(assignmentId, update.getUser());

            Optional.of(user).ifPresent(codeReviewer -> assignment.get().setCodeReviewer(codeReviewer));
            assignment.get().setStatus(update.getStatus());
            Optional.ofNullable(update.getReviewVideoUrl()).ifPresent(videoUrl -> assignment.get().setReviewVideoUrl(videoUrl));

        } else {
            assignment = assignmentLookup(assignmentId, user);

            Optional.ofNullable(update.getGithubUrl()).ifPresent(url -> assignment.get().setGithubUrl(url));
            Optional.ofNullable(update.getBranch()).ifPresent(branch -> assignment.get().setBranch(branch));
            assignment.get().setStatus(AssignmentStatusEnum.SUBMITTED.getStatus());

        }

        AssignmentResponseDto assignmentDto = new AssignmentResponseDto(assignment.orElse(null));

        assignmentRepository.save(assignment.get());

        return new ResponseEntity<>(assignmentDto, HttpStatus.OK);
    }

    /**
     * Saves a new assignment.
     * @param assignment
     * @param user
     * @return HTTPStatus response with the new assignment.
     */
    @PostMapping(value = "/api/assignments")
    public ResponseEntity<AssignmentResponseDto> createAssignment(@RequestBody Assignment assignment,
                                              @AuthenticationPrincipal User user) {
        assignment.setNumber(new Random().nextInt(100));
        assignment.setUser(user);
        assignment.setStatus(AssignmentStatusEnum.SUBMITTED.getStatus());

        assignmentRepository.save(assignment);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * Finds an assignment by id and user or by id and reviewer.
     * @param assignmentId
     * @param user
     * @return assignment
     */
    private Optional<Assignment> assignmentLookup(Long assignmentId, User user) {
        GrantedAuthority userAuthority = user.getAuthorities().stream().findFirst().get();

        if (userAuthority.toString().equals(AuthorityEnum.REVIEWER.name())) {
            return Optional.ofNullable(assignmentRepository.findByIdAndCodeReviewer(assignmentId, user)
                        .orElseThrow(() -> new AssignmentNotFoundException("Assignment not found"))
            );

        } else {
            return Optional.ofNullable(assignmentRepository.findByIdAndUser(assignmentId, user)
                        .orElseThrow(() -> new AssignmentNotFoundException("Assignment not found"))
            );
        }
    }
}
