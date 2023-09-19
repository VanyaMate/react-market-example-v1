import { UserOutlined } from '@ant-design/icons';
import css from './profile-header.module.scss';
import { Button } from 'antd';


const ProfileHeader = () => {
    return (
        <div className={ css.container }>
            <Button
                type={ 'dashed' }
                size={ 'large' }
                className={ css.button }
            >
                <UserOutlined className={ css.icon }/>
            </Button>
        </div>
    );
};

export default ProfileHeader;