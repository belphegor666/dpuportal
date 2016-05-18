package net.atos.tenderingportal.domain.enums;

public enum SystemRole {
    USER("USER"),
    ADMIN("ADMIN");

    private String value;

    SystemRole(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static SystemRole roleOf(String value){
        if (value != null){
            for (SystemRole role: SystemRole.values()){
                if (value.equalsIgnoreCase(role.getValue())){
                    return role;
                }
            }
        }
        return null;
    }

}
