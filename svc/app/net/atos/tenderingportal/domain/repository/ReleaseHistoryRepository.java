package net.atos.tenderingportal.domain.repository;

import net.atos.tenderingportal.domain.model.ReleaseHistory;

import java.util.List;

public interface ReleaseHistoryRepository {

    public List<ReleaseHistory> findAll();
}
