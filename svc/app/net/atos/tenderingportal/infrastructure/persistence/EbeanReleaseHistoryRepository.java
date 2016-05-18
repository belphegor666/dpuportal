package net.atos.tenderingportal.infrastructure.persistence;

import net.atos.tenderingportal.domain.model.ReleaseHistory;
import net.atos.tenderingportal.domain.repository.ReleaseHistoryRepository;

import java.util.List;

public class EbeanReleaseHistoryRepository extends EbeanGenericRepository<Long, ReleaseHistory> implements ReleaseHistoryRepository{

    @Override
    Class<ReleaseHistory> getTClass() {
        return ReleaseHistory.class;
    }

    @Override
    public List<ReleaseHistory> findAll() {
        return FINDER.where().orderBy("versionDate desc").findList();
    }
}
