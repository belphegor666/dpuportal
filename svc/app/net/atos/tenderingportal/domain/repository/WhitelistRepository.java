package net.atos.tenderingportal.domain.repository;

import net.atos.tenderingportal.domain.model.Whitelist;

public interface WhitelistRepository extends GenericRepository<Long, Whitelist> {

    Whitelist findByDomain(String domain);

}
