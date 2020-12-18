import react from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { setCurrentCar } from '../../redux/reducers/car/carActions';
import { setProductsCategoryCar } from '../../redux/reducers/product/productActions';
import { useHistory } from 'react-router-dom';


export default function CarNavbarCard (props) {
    const {carAnchorEl, isOpen, onClose, garageCars, currentCar} = props;
    const currentCategory = useSelector(({categoryReducer}) => categoryReducer.currentCategory);
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <Popper open={isOpen} anchorEl={carAnchorEl} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={onClose}>
                  <MenuList autoFocusItem={isOpen} id="menu-list-grow">
                    {
                        garageCars.map(item => {
                            return <MenuItem 
                                        onClick={() => { 
                                            dispatch(setCurrentCar(item));
                                            if(currentCategory) dispatch(setProductsCategoryCar(currentCategory.id, item.id));
                                            onClose();
                                        }}
                                        key={item.id}
                                    >
                                        {`${item.brand} ${item.model} ${item.year}`}
                                    </MenuItem>
                        })
                    }
                    <MenuItem onClick={() => history.push('/car')}>Add New Car</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
    );
}