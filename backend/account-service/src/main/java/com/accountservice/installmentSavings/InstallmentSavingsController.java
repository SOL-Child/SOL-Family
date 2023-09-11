package com.accountservice.installmentSavings;

import com.accountservice.global.dto.BaseResponseBody;
import com.accountservice.installmentSavings.entity.InstallmentSavings;
import com.accountservice.installmentSavings.service.InstallmentSavingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1")
public class InstallmentSavingsController {

    private final InstallmentSavingsService installmentSavingsService;

    @GetMapping("/savings")
    public ResponseEntity<? extends BaseResponseBody> getInstallmentSavingsList(){
        List<InstallmentSavings> savings = installmentSavingsService.findInstallmentSavingsList();
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, savings));
    }
}