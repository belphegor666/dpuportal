package net.atos.tenderingportal.domain.service;

import net.atos.tenderingportal.domain.model.Certification;
import net.atos.tenderingportal.domain.model.User;
import net.atos.tenderingportal.domain.repository.CertificationRepository;
import net.atos.tenderingportal.domain.repository.UserRepository;

import javax.inject.Inject;
import java.util.List;

public class CertificationService {

    private CertificationRepository certificationRepository;

    private UserRepository userRepository;


    @Inject
    public CertificationService(CertificationRepository certificationRepository, UserRepository userRepository) {
        this.certificationRepository = certificationRepository;
        this.userRepository = userRepository;
    }

    public List<Certification> findUserCertifications(Long userId){
        return certificationRepository.findAllByUserId(userId);
    }

    public Certification createCertification(Certification certification, Long userId) {
        Certification persistedCertificate = certificationRepository.findByCertificateName(certification.getCertificate(), userId);

        //Certificate exists for user, Update with new values
        if(null != persistedCertificate){
            certification.setId(persistedCertificate.getId());
            updateCertification(certification);
        } else {
            User user = new User();
            user.setUserId(userId);
            certification.setUser(user);

            certificationRepository.save(certification);
        }

        return certification;
    }

    public Certification updateCertification(Certification certification) {
        certificationRepository.update(certification);
        return certification;
    }

}

