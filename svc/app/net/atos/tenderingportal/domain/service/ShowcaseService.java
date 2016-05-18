package net.atos.tenderingportal.domain.service;

import net.atos.tenderingportal.domain.model.Showcase;
import net.atos.tenderingportal.domain.repository.ShowcaseRepository;

import javax.inject.Inject;
import java.util.List;

public class ShowcaseService {

    private ShowcaseRepository showcaseRepository;

    @Inject
    public ShowcaseService(ShowcaseRepository showcaseRepository) {
        this.showcaseRepository = showcaseRepository;
    }

    public List<Showcase> getAllShowcases() {
        List<Showcase> showcases = showcaseRepository.getAllShowcases();

        return showcases;
    }
}