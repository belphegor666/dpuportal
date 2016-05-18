package net.atos.tenderingportal.domain.service;

import net.atos.tenderingportal.domain.model.ReleaseHistory;
import net.atos.tenderingportal.domain.repository.ReleaseHistoryRepository;

import javax.inject.Inject;
import java.util.List;

public class ReleaseHistoryService {

    private ReleaseHistoryRepository releaseHistoryRepository;

    @Inject
    public ReleaseHistoryService(ReleaseHistoryRepository releaseHistoryRepository) {
        this.releaseHistoryRepository = releaseHistoryRepository;
    }

    public List<ReleaseHistory> listAll(){
         return releaseHistoryRepository.findAll();
    }
}
