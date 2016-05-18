package net.atos.tenderingportal.infrastructure.persistence;

import com.google.inject.AbstractModule;

import net.atos.tenderingportal.domain.repository.*;

public class PersistenceModule extends AbstractModule {

    @Override
    protected void configure() {
        bind(ProjectRepository.class).to(EbeanProjectRepository.class);
        bind(UserRepository.class).to(EbeanUserRepository.class);
        bind(SprintRepository.class).to(EbeanSprintRepository.class);
        bind(SprintUserRepository.class).to(EbeanSprintUserRepository.class);
        bind(WhitelistRepository.class).to(EbeanWhitelistRepository.class);
        bind(StoryRepository.class).to(EbeanStoryRepository.class);
        bind(StoryMemberRepository.class).to(EbeanStoryMemberRepository.class);
        bind(ReleaseHistoryRepository.class).to(EbeanReleaseHistoryRepository.class);
        bind(CodeBookRepository.class).to(EbeanCodeBookRepository.class);
        bind(CertificationRepository.class).to(EbeanCertificationRepository.class);
        bind(ShowcaseRepository.class).to(EbeanShowcaseRepository.class);
    }
}
