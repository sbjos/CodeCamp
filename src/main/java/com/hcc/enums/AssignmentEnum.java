package com.hcc.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AssignmentEnum {
    // Learner
    CREATE(1, "Create Assignment"),
    EDIT(2, "Edit Assignment"),
    VIEW(3, "View Assignment"),

    // Reviewer
    CLAIM(4, "Claim Assignment"),
    REVIEW(5, "Review Assignment"),
    COMPLETE(6, "Assignment Completed"),
    NEEDS_REVIEW(7, "Assignment Needs Work"),
    RECLAIM(8, "Reclaim Assignment");

    private final int assignmentNumber;

    private final String assignmentMessage;

    AssignmentEnum(int assignmentNumber, String assignmentMessage) {
        this.assignmentNumber = assignmentNumber;
        this.assignmentMessage = assignmentMessage;
    }

    public int getAssignmentNumber() {
        return assignmentNumber;
    }

    public String getAssignmentMessage() {
        return assignmentMessage;
    }
}
