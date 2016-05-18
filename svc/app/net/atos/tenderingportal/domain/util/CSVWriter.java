package net.atos.tenderingportal.domain.util;

import net.atos.tenderingportal.domain.dto.ProjectDto;
import net.atos.tenderingportal.domain.dto.SprintDto;
import net.atos.tenderingportal.domain.dto.SprintUserDto;
import org.apache.commons.lang3.time.DateFormatUtils;

import java.util.List;

public class CSVWriter {

    private static final String COMMA_DELIMITER = ",";
    private static final String NEW_LINE_SEPARATOR = "\n";
    private static final String FILE_HEADER = "req_id,title, sprint_no, sprint_start, sprint_end, email, firstName,surname";

    public String write(List<ProjectDto> projects){
        StringBuilder csv = new StringBuilder();
        //Write the CSV file header
        csv.append(FILE_HEADER);
        //New line seperator after header
        csv.append(NEW_LINE_SEPARATOR);

        for (ProjectDto project: projects){
            for (SprintDto sprint: project.getSprints()){
                for (SprintUserDto sprintUser: sprint.getMembers()){
                    csv.append(project.getProjectCode());
                    csv.append(COMMA_DELIMITER);
                    csv.append(project.getTitle());
                    csv.append(COMMA_DELIMITER);
                    csv.append(sprint.getSprintNo());
                    csv.append(COMMA_DELIMITER);
                    csv.append(DateFormatUtils.format(sprint.getStartDate(), "yyyy-MM-dd"));
                    csv.append(COMMA_DELIMITER);
                    csv.append(DateFormatUtils.format(sprint.getEndDate(), "yyyy-MM-dd"));
                    csv.append(COMMA_DELIMITER);
                    csv.append(sprintUser.getEmail());
                    csv.append(COMMA_DELIMITER);
                    csv.append(sprintUser.getForename());
                    csv.append(COMMA_DELIMITER);
                    csv.append(sprintUser.getSurname());
                    csv.append(NEW_LINE_SEPARATOR);
                }
            }
        }
        return csv.toString();
    }
}
