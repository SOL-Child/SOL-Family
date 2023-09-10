package com.accountservice.fund;

import com.accountservice.fund.entity.Fund;
import com.accountservice.fund.service.FundService;
import com.accountservice.global.dto.BaseResponseBody;
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
public class FundController {

    private final FundService fundService;

    @GetMapping("/funds")
    public ResponseEntity<? extends BaseResponseBody> getFundList(){
        List<Fund> funds = fundService.findFundList();
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, funds));
    }
}
