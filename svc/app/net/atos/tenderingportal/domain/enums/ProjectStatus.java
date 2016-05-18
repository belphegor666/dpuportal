package net.atos.tenderingportal.domain.enums;

public enum ProjectStatus {
    DRAFT("DRAFT"),
    SUBMITTED("SUBMITTED"),
    EVALUATION("EVALUATION"),
    SCHEDULED("SCHEDULED"),
    IN_DEVELOPMENT("IN_DEVELOPMENT"),
    ON_HOLD("ON_HOLD"),
    CLOSED_OK("CLOSED_OK"),
    CLOSED_NOT_COMPLETE("CLOSED_NOT_COMPLETE"),
    REJECTED("REJECTED"),
    APPROVED("APPROVED"),
    CANCELLED("CANCELLED");

    private String value;

    ProjectStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static ProjectStatus statusOf(String value){
        if (value != null){
            for (ProjectStatus projectStatus: ProjectStatus.values()){
                if (value.equalsIgnoreCase(projectStatus.getValue())){
                    return projectStatus;
                }
            }
        }
        return null;
    }
}
