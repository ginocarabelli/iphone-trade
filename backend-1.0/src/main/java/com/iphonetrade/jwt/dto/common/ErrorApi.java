package com.iphonetrade.jwt.dto.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ErrorApi {

    private String timestamp;
    private Integer status;
    private String error;
    private String message;

}
