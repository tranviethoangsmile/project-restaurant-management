package com.codegym.service.bill;

import com.codegym.entity.Bill;
import com.codegym.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public class BillService implements IBillService{
    @Autowired
    BillRepository billRepository;
    @Override
    public Iterable<Bill> findAll() {
        return billRepository.findAll();
    }

    @Override
    public Optional<Bill> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public Bill save(Bill bill) {
        return billRepository.save(bill);
    }

    @Override
    public void remove(Long id) {

    }
}
