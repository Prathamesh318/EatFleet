package com.infosys.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.infosys.admin.Model.Address;


@Repository
public interface AddressRepo extends JpaRepository<Address, Long>{

}
