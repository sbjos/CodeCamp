package com.hcc.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AuthorityEnum {
    STUDENT(1, "role_student"),
    INSTRUCTOR(2, "role_Instructor");

    private final int authorityNumber;

    private final String authorityMessage;

    AuthorityEnum(int authorityNumber, String authorityMessage) {
        this.authorityNumber = authorityNumber;
        this.authorityMessage = authorityMessage;
    }

    public int getAuthorityNumber() {
        return authorityNumber;
    }

    public String getAuthorityMessage() {
        return authorityMessage;
    }
}
