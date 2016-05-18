package net.atos.tenderingportal.domain.enums;

public enum FundingType {
    CLIENT_FUNDED("client"),
    INTERNALLY_FUNDED("internal"),
    NO_FUNDING("no_funding");

    private String value;

    FundingType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static FundingType typeOf(String value){
        if (value != null){
            for (FundingType fundingType: FundingType.values()){
                if (value.equalsIgnoreCase(fundingType.getValue())){
                    return fundingType;
                }
            }
        }
        return null;
    }
}
