import React, { useState } from "react";
import {
  Card,
  Content,
  PlanTitle,
  PlanCost,
  FeatureListItem,
  BackgroundSqaure,
  Wrapper,
} from "./PriceCard.css";
import PriceTipModal from "./PriceTipModal";

const PriceCard = ({ priceInfo, toggle, video }) => {
  const [showModalNew, setShowModalNew] = useState(false);
  const closeModalNew = () => {
    setShowModalNew(false);
  };
  return (
    <Wrapper>
      <a onClick={() => setShowModalNew(true)}>
        <Card>
          <BackgroundSqaure />
          <Content>
            <PlanTitle></PlanTitle>
            <PlanCost>${priceInfo.price}</PlanCost>
            {priceInfo.features.map((item,index) => (
              <FeatureListItem key={`feature-list-item-${index}`}>
                <span>{item}</span>
              </FeatureListItem>
            ))}
          </Content>
        </Card>
      </a>
      {showModalNew && (
        <PriceTipModal
          closeModalNew={closeModalNew}
          price={priceInfo.price}
          toggle={toggle}
          video={video}
          action={'tip'}
        />
      )}
    </Wrapper>
  );
};

export default PriceCard;
