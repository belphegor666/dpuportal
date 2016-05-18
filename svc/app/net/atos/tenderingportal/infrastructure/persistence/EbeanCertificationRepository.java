package net.atos.tenderingportal.infrastructure.persistence;

import net.atos.tenderingportal.domain.model.Certification;
import net.atos.tenderingportal.domain.repository.CertificationRepository;

import java.util.List;


public class EbeanCertificationRepository extends EbeanGenericRepository<Long, Certification> implements CertificationRepository {

    @Override
    Class<Certification> getTClass() {
        return Certification.class;
    }

    @Override
    public List<Certification> findAllByUserId(Long userId) {
        return FINDER.where().eq("user.userId", userId).findList();
    }

    @Override
    public Certification findByCertificateName(String certificateName, Long userId) {
        return FINDER.where().eq("user.userId", userId).eq("certificate", certificateName).findUnique();
    }

}
