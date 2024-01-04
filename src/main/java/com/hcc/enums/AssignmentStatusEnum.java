package com.hcc.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AssignmentStatusEnum {

    IN_PROGRESS(1, "in progress"),
    SUBMITTED(2, "submitted"),
    NEEDS_REVIEW(3, "needs review"),
    COMPLETED(4, "completed");

    private final int number;

    private final String status;

    AssignmentStatusEnum(int number, String status) {
        this.number = number;
        this.status = status;
    }

    public int getNumber() {
        return number;
    }

    public String getStatus() {
        return status;
    }
}
