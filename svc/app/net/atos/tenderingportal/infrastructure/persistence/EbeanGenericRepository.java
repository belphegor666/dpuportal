package net.atos.tenderingportal.infrastructure.persistence;

import com.avaje.ebean.Model;
import net.atos.tenderingportal.domain.repository.GenericRepository;

/**
 * Created by koolrich on 21/09/15.
 */
public abstract class EbeanGenericRepository<ID, T> implements GenericRepository<ID, T> {

    abstract Class<T> getTClass();

    public Model.Finder<ID, T> FINDER = new Model.Finder<>(getTClass());

    public void save(T t){
        Model.Finder<ID, T> FINDER = new Model.Finder<>(getTClass());
        FINDER.db().save(t) ;
    }

    @Override
    public T findById(ID id) {
        return FINDER.byId(id);
    }

    @Override
    public void delete(ID id) {
        FINDER.deleteById(id);
    }

    @Override
    public void update(T t) {
        FINDER.db().update(t);
    }
}
