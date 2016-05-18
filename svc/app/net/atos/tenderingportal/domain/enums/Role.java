package net.atos.tenderingportal.domain.enums;

public enum Role {
    SCRUMMASTER("SCRUM MASTER"),
    DEVELOPER("DEVELOPER"),
    TESTER("TESTER");

    private String value;

    Role(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static Role roleOf(String value){
        if (value != null){
            for (Role role: Role.values()){
                if (value.equalsIgnoreCase(role.getValue())){
                    return role;
                }
            }
        }
        return null;
    }
}
