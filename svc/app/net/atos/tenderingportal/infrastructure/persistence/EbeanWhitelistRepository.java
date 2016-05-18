package net.atos.tenderingportal.infrastructure.persistence;

import net.atos.tenderingportal.domain.model.Whitelist;
import net.atos.tenderingportal.domain.repository.WhitelistRepository;

import java.util.List;

public class EbeanWhitelistRepository extends EbeanGenericRepository<Long, Whitelist> implements WhitelistRepository {

    @Override
    Class<Whitelist> getTClass() {
        return Whitelist.class;
    }

    @Override
    public Whitelist findByDomain(String domain) {
        Whitelist whitelist = FINDER.where().ieq("domain_name", domain).findUnique();

        return whitelist;
    }

}
