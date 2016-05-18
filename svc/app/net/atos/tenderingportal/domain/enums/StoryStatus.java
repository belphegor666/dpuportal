package net.atos.tenderingportal.domain.enums;

public enum StoryStatus {
    PRODUCT_BACKLOG("product_backlog"),
    SPRINT_BACKLOG("sprint_backlog"),
    IN_ANALYSIS("in_ba"),
    IN_DEVELOPMENT("in_development"),
    IN_TEST("in_test"),
    COMPLETE("complete");

    private String value;

    StoryStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static StoryStatus statusOf(String value){
        if (value != null){
            for (StoryStatus storyStatus: StoryStatus.values()){
                if (value.equalsIgnoreCase(storyStatus.getValue())){
                    return storyStatus;
                }
            }
        }
        return null;
    }
}
