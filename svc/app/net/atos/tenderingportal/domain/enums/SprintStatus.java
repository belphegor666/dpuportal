package net.atos.tenderingportal.domain.enums;

public enum SprintStatus {
    COMPLETED("COMPLETED"),
    IN_PROGRESS("IN_PROGRESS"),
    PLANNED("PLANNED");

    private String value;

    SprintStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static SprintStatus statusOf(String value){
        if (value != null){
            for (SprintStatus sprintStatus: SprintStatus.values()){
                if (value.equalsIgnoreCase(sprintStatus.getValue())){
                    return sprintStatus;
                }
            }
        }
        return null;
    }
}
