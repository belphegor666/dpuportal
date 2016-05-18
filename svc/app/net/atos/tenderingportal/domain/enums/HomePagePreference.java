package net.atos.tenderingportal.domain.enums;

public enum HomePagePreference {
    WELCOME("WELCOME"),
    REQUIREMENT("REQUIREMENT"),
    DEVELOPER("DEVELOPER"),
    PROJECT("PROJECT"),
    EXECUTIVE("EXECUTIVE");

    private String value;

    HomePagePreference(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static HomePagePreference statusOf(String value){
        if (value != null){
            for (HomePagePreference homePagePreference : HomePagePreference.values()){
                if (value.equalsIgnoreCase(homePagePreference.getValue())){
                    return homePagePreference;
                }
            }
        }
        return null;
    }
}
