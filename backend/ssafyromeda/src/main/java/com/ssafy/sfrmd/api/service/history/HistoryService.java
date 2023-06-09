package com.ssafy.sfrmd.api.service.history;

import com.ssafy.sfrmd.api.domain.history.History;
import com.ssafy.sfrmd.api.domain.history.HistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HistoryService {
    private final HistoryRepository historyRepository;

    public History getHistory(Long userNo){
        return historyRepository.findByUserNo(userNo).orElseGet(() -> createHistory(userNo));
    }

    private History createHistory(Long userNo) {
        return historyRepository.save(History.builder()
                .userNo(userNo)
                .historyPlayCount(0)
                .historyWinCount(0)
                .historyLoseCount(0).build());
    }

    public History updateHistoryWinCount(Long userNo){
        History history = historyRepository.findByUserNo(userNo).orElseThrow(NullPointerException::new);
        history.updateHistoryPlayCount();
        history.updateHistoryWinCount();
        return historyRepository.save(history);
    }

    public History updateHistoryLoseCount(Long userNo){
        History history = historyRepository.findByUserNo(userNo).orElseThrow(NullPointerException::new);
        history.updateHistoryPlayCount();
        history.updateHistoryLoseCount();
        return historyRepository.save(history);
    }
}
