package net.atos.tenderingportal.domain.repository;


import net.atos.tenderingportal.domain.model.Certification;

import java.util.List;

public interface CertificationRepository extends GenericRepository<Long, Certification>{

    List<Certification> findAllByUserId(Long userId);
    Certification findByCertificateName(String certificateName, Long userId);
}
