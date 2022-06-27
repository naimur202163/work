import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    // ["@media (max-width:600px)"]: {
    //   width: "50%",
    // },
  },
  listItemStyles: {
    border: "1px solid gray",
    borderRadius: "5px",
    color: "gray",
    marginBottom: "0.5rem",
  },
  TypographyStyles: {
    color: "white",
  },
}));

export default function SavedPaymentMethodList({
  user,
  setSelectedPaymentMethod,
}) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(null);
  const { paymentMethods } = user;

  const handleToggle = (pm, value) => () => {
    if (value === checked) {
      setChecked(null);
    } else {
      setSelectedPaymentMethod(pm);
      setChecked(value);
    }
  };

  return (
    <List dense className={classes.root}>
      <Typography variant="body1" gutterBottom class={classes.TypographyStyles}>
        Or select a saved payment method
      </Typography>
      {paymentMethods &&
        paymentMethods.data.length &&
        paymentMethods.data.map((pm) => {
          const labelId = `checkbox-list-secondary-label-${pm.id}`;
          return (
            <ListItem key={pm.id} className={classes.listItemStyles}>
              <ListItemText id={labelId} primary={pm.card.brand} />
              <ListItemText
                id={labelId}
                primary={"**** **** **** " + pm.card.last4}
              />
              <ListItemSecondaryAction>
                <Checkbox
                  disableFocusRipple
                  disableRipple
                  edge="end"
                  onChange={handleToggle(pm, pm.id)}
                  checked={checked === pm.id}
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
    </List>
  );
}
