
import UserLayout from './UserLayOut';
import Footer from './Footer';

const AppLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <UserLayout />

      <div style={{ flex: 1 }}>
      </div>

      <Footer />
    </div>
  );
};

export default AppLayout;
