package net.atos.tenderingportal.infrastructure.persistence;

import net.atos.tenderingportal.domain.model.Showcase;
import net.atos.tenderingportal.domain.repository.ShowcaseRepository;

import java.util.List;

public class EbeanShowcaseRepository extends EbeanGenericRepository<Long, Showcase> implements ShowcaseRepository {

    @Override
    Class<Showcase> getTClass() {
        return Showcase.class;
    }

    @Override
    public List<Showcase> getAllShowcases() {
        return FINDER.all();
    }
}