package net.atos.tenderingportal.domain.repository;

import net.atos.tenderingportal.domain.model.Sprint;

import java.util.Date;
import java.util.List;

public interface SprintRepository extends GenericRepository<Long, Sprint> {

    List<Sprint> findAllByProject(Long project);
    List<Sprint> findActiveSprintsByDate(Date date);
}