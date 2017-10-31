//given n amount of auctions to place

// simulate group id's that win 

//return groupID so that we can query their ads to return to client 

const bidSimulator = (amount, topInterest) => {

    // based on top category;
    // create a merge table between interests/categories/adgroups
    // query all ad_groups with top cpm + in between start/end Dates 
    // as well the balance being under daily budget.

    // for now we will query just top highest cpc 
  let winners = [];
  //for now it will be random numbers
  // later it will only
  for (var i = 0; i < amount; i++) {
    // General idea of querying tims database and my database(for active_ads) 
    
    // const activeAdGroups = SELECT * FROM devon.active_ad_groups 
    //                         INNER JOIN tim.ad_groups 
    //                         ON active_ad_groups.ad_group_id = ad_groups.id

    // const groupsWithInterest = SELECT * FROM ${activeAdGroups}, tim.categories, tim.interests
    //                             WHERE ${givenInterestId} = categories.interest_id
    //                             AND ad_groups.id = categories.ad_group_id

    // const groupsWithinDateRange = SELECT * FROM ${groupsWithInterest}
    //                             WHERE start_date <= ${new Date(Date.now())}
    //                             AND ${new Date(Date.now())} < end_date
            
    // const groupsWithinBudget = SELECT * FROM ${groupsWithinDateRange}
    //                             WHERE balance + CPC < daily_budget
    //                             ORDER BY CPC DESC
            
    // const queryString = groupsWithinBudget;
    // const winningBid = db.query(queryString)[0];
  }
  return winners;
};

