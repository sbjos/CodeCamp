package com.hcc.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AssignmentStatusEnum {
    IN_REVIEW(1, "Assignment In Review"),
    REVISION(2, "Assignment Needs work"),
    COMPLETED(3, "Assignment Completed");

    private final int assignmentNumber;

    private final String assignmentMessage;

    AssignmentStatusEnum(int assignmentNumber, String assignmentMessage) {
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
