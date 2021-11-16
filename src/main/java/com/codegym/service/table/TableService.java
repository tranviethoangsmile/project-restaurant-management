package com.codegym.service.table;

import com.codegym.entity.Desk;
import com.codegym.repository.TablesRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public class TableService implements ITableService{
    @Autowired
    TablesRepository tablesRepository;
    @Override
    public Iterable<Desk> findAll() {
        return null;
    }

    @Override
    public Optional<Desk> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public Desk save(Desk tables) {
        return null;
    }

    @Override
    public void remove(Long id) {

    }
}
