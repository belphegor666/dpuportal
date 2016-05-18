package net.atos.tenderingportal.infrastructure.persistence;

import net.atos.tenderingportal.domain.model.CodeBook;
import net.atos.tenderingportal.domain.repository.CodeBookRepository;

import java.util.List;

public class EbeanCodeBookRepository extends EbeanGenericRepository<Long, CodeBook> implements CodeBookRepository{

    @Override
    Class<CodeBook> getTClass() {
        return CodeBook.class;
    }

    @Override
    public List<CodeBook> findAll() {
        return FINDER.all();
    }
}
