Feature: End to end Ecommerce Validation

    Application Regression

    Scenario: Ecommerce products delivery
    Given I open Ecommerce page
    When I add items to Cart
    And validate the total prices
    Then select the country submit and verify Thank You message

    Scenario: Filling in the form for the shop
    Given I open Ecommerce page
    When I fill the form details
    Then validate the form behaviour
    And select the shop page
    