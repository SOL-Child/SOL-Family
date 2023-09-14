package com.accountservice.loan;
import com.accountservice.global.dto.BaseResponseBody;
import com.accountservice.loan.dto.request.LoanReqDto;
import com.accountservice.loan.dto.response.LoanResDto;
import com.accountservice.loan.service.LoanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1")
public class LoanController {

    private final LoanService loanService;

    // 대출 신청
    @PostMapping("/loans")
    public ResponseEntity<? extends BaseResponseBody> createLoan(@RequestHeader(value = "X-JWT-Claim-identification", required = false) String identification,
                                                                 @RequestHeader(value = "X-JWT-Claim-auth", required = false) String auth,
                                                                 @RequestBody LoanReqDto loanReqDto) {
        loanService.createLoan(loanReqDto, auth, identification);
        return ResponseEntity.status(HttpStatus.CREATED).body(BaseResponseBody.of(0,"Success"));
    }

    // 대출 조회
    @GetMapping("/loans/{loanId}")
    public ResponseEntity<? extends BaseResponseBody> getLoan(@PathVariable(name = "loanId") Long loanId) {
        LoanResDto loan = loanService.findLoan(loanId);
        return ResponseEntity.status(HttpStatus.OK).body(BaseResponseBody.of(0, loan));
    }
}
