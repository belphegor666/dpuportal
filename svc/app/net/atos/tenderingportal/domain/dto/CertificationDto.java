package net.atos.tenderingportal.domain.dto;

/**
 * Data Transfer Object to hold fields of a Certification.
 */
public class CertificationDto {

    private Long id;
    private float percentComplete;
    private String certificate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public float getPercentComplete() {
        return percentComplete;
    }

    public void setPercentComplete(float percentComplete) {
        this.percentComplete = percentComplete;
    }

    public String getCertificate() {
        return certificate;
    }

    public void setCertificate(String certificate) {
        this.certificate = certificate;
    }
}
