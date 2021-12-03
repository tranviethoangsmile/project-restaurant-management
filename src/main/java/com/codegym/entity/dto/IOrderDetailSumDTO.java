package com.codegym.entity.dto;

import java.math.BigDecimal;

public interface IOrderDetailSumDTO {

    String getProductName();
    BigDecimal getUnitPrice();
    Integer getQuantity();
    BigDecimal getProductPrice();
}
