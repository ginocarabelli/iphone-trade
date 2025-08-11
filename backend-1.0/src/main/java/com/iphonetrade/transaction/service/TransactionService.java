package com.iphonetrade.transaction.service;

import com.iphonetrade.transaction.dto.TransactionDeviceDto;
import com.iphonetrade.transaction.dto.TransactionDto;
import com.iphonetrade.transaction.model.Transaction;
import java.util.List;

public interface TransactionService {
    TransactionDto save(TransactionDto dto);
    List<TransactionDto> findAll();
    TransactionDto findById(Long id);
    TransactionDto update(Long id, TransactionDto dto);
    TransactionDto delete(Long id);
}