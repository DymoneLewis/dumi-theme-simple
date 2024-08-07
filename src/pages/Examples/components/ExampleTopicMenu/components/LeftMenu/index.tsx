import React, { useState } from 'react';
import { Anchor, Menu } from 'antd';
import { useLocale } from 'dumi';
import { createFromIconfontCN } from '@ant-design/icons';
import { getCategoryId } from '../../../../utils';
import { LeftMenuProps } from '../../../../types';
import styles from '../../../../index.module.less';

const MenuIcon = createFromIconfontCN({
  scriptUrl:
    'https://cdn.jsdelivr.net/gh/Logic-Flow/static@latest/docs/iconfont/iconfont.js', // self generate
});

/**
 * LeftMenu
 *
 * @param {LeftMenuProps} props 相关参数，详见类型定义
 * @returns {React.FC} React.FC
 */
export const LeftMenu: React.FC<LeftMenuProps> = (props) => {
  const { exampleTopics } = props;

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const locale = useLocale();
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  return (
    <Anchor className={styles.galleryAnchor}>
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        style={{ height: '100vh' }}
        openKeys={openKeys}
        onOpenChange={(currentOpenKeys) =>
          setOpenKeys(currentOpenKeys as string[])
        }
        forceSubMenuRender
      >
        {exampleTopics.map((topic) => {
          return (
            <Menu.SubMenu
              key={topic.id}
              title={
                <div>
                  <MenuIcon
                    className={styles.menuIcon}
                    type={`icon-${topic.icon}`}
                  />
                  <span>{topic.title[locale.id]}</span>
                </div>
              }
            >
              {topic.examples.map((example) => {
                return (
                  <Menu.Item key={example.id}>
                    <Anchor.Link
                      href={`#${getCategoryId(topic.id, example.id)}`}
                      title={
                        <div>
                          <span>{example.title[locale.id]}</span>
                        </div>
                      }
                    />
                  </Menu.Item>
                );
              })}
            </Menu.SubMenu>
          );
        })}
      </Menu>
    </Anchor>
  );
};
