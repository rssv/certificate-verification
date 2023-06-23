import MainHeader from "./MainHeader";
import classes from '../styles/Layout.module.css';
import SidePane from "./SidePane";

type Props = {
    children?: React.ReactNode,
    sideButtons: React.JSX.Element
};
  

const Layout: React.FC<Props> = ({children, sideButtons }) => {
    return (
        <>
            <MainHeader />
            <main className={classes.main_content}>
                <SidePane />
                <div className={classes.main_conten_sans_sidePane}>{ children }</div>
            </main>
        </>
    )
}


export default Layout;