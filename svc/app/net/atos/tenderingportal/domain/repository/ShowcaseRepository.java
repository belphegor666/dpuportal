package net.atos.tenderingportal.domain.repository;

import net.atos.tenderingportal.domain.model.Showcase;

import java.util.List;

public interface ShowcaseRepository extends GenericRepository<Long, Showcase> {

    List<Showcase> getAllShowcases();

}