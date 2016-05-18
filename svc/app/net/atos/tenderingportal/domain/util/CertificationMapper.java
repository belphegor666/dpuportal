package net.atos.tenderingportal.domain.util;

import net.atos.tenderingportal.domain.dto.CertificationDto;
import net.atos.tenderingportal.domain.model.Certification;

/**
 * Mapper class for populating a CertificationDto.
 */
public class CertificationMapper {

    /**
     * Maps a Certification to a CertificationDto.
     *
     * @param certification The Certification to map
     * @return A CertificationDto with the mapping
     */
    public CertificationDto mapCertificationToDto(Certification certification) {
        CertificationDto certificationDto = new CertificationDto();
        certificationDto.setId(certification.getId());
        certificationDto.setPercentComplete(certification.getPercentComplete());
        certificationDto.setCertificate(certification.getCertificate());
        return certificationDto;
    }
}
