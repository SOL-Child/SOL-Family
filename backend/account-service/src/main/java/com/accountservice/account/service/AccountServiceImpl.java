package com.accountservice.account.service;

import com.accountservice.account.config.RandomWordCombiner;
import com.accountservice.account.dto.request.ConnectReqDto;
import com.accountservice.account.entity.Account;
import com.accountservice.account.entity.BookType;
import com.accountservice.account.entity.OneTransfer;
import com.accountservice.account.exception.TransferCodeException;
import com.accountservice.account.repository.JpaAccountRepository;
import com.accountservice.account.repository.JpaOneTransferRepository;
import com.accountservice.global.error.ErrorCode;
import com.accountservice.global.error.exception.BusinessException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service("accountService")
@Transactional
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService{

    private final RandomWordCombiner randomWordCombiner;
    private final JpaOneTransferRepository jpaOneTransferRepository;
    private final JpaAccountRepository jpaAccountRepository;

    @Override
    public void oneTransfer(String identification, String account) throws IOException, InterruptedException {
        String memo = randomWordCombiner.getCombinedRandomWord();

        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> requestBody = new HashMap<>();

        Map<String, String> dataHeader = new HashMap<>();
        dataHeader.put("apikey", "2023_Shinhan_SSAFY_Hackathon");

        Map<String, Object> dataBody = new HashMap<>();
        dataBody.put("입금은행코드", "088");
        dataBody.put("입금계좌번호", account);
        dataBody.put("입금통장메모", memo);

        requestBody.put("dataHeader", dataHeader);
        requestBody.put("dataBody", dataBody);


        String jsonPayload = objectMapper.writeValueAsString(requestBody);

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://shbhack.shinhan.com/v1/auth/1transfer"))
                .POST(HttpRequest.BodyPublishers.ofString(jsonPayload)) // JSON 데이터를 요청 body로 설정
                .header("Content-Type", "application/json") // Content-Type 헤더 설정
                .build();

        int status = client.send(request, HttpResponse.BodyHandlers.ofString()).statusCode();
        if (status == 200) {
            OneTransfer oneTransfer = OneTransfer.builder()
                    .account(account)
                    .code(memo)
                    .identification(identification)
                    .build();
        }
    }

    @Override
    public void connectAccount(String identification, ConnectReqDto connectReqDto, String bookType) {
        Optional<OneTransfer> oneTransfer = jpaOneTransferRepository.findByAccount(connectReqDto.getAccount());
        if (oneTransfer.isPresent()) {
            if(oneTransfer.get().getExp().isBefore(LocalDateTime.now())) throw new TransferCodeException(ErrorCode.TIMEOUT_TRANSFER_CODE);
            if (!oneTransfer.get().getCode().equals(connectReqDto.getMemo()))
                throw new TransferCodeException(ErrorCode.INVALID_TRANSFER_CODE);
            Account account = Account.builder()
                    .account(connectReqDto.getAccount())
                    .identification(identification)
                    .bookType(BookType.valueOf(bookType))
                    .build();

            jpaAccountRepository.save(account);
        }
        throw new TransferCodeException(ErrorCode.TRANSFER_CODE_NOT_EXIST);
    }
}
