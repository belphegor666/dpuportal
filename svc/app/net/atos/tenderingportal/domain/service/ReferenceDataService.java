package net.atos.tenderingportal.domain.service;

import net.atos.tenderingportal.domain.model.CodeBook;
import net.atos.tenderingportal.domain.repository.CodeBookRepository;

import javax.inject.Inject;
import java.util.List;

public class ReferenceDataService {

    private CodeBookRepository codeBookRepository;

    @Inject
    public ReferenceDataService(CodeBookRepository codeBookRepository) {
        this.codeBookRepository = codeBookRepository;
    }

    public List<CodeBook> getCodeBook(){
        return codeBookRepository.findAll();
    }
}
