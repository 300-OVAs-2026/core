import { Content } from '@layouts';
import { Button } from '@ui';
import { Icon, Panel } from 'books-ui';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

import { cn } from '@/shared/utils';
import { useOvaStore } from '@/store/ova-store';

import { AVATARS } from './lib/constants';

import { type Avatar, AvatarVariation } from './types/type';

import css from './avatar.module.css';

const AVATARS_PER_SECTION = 6;

/**
 * Function to split the avatars into sections for the panel navigation.
 *
 * @param avatars - List of avatars to be split into sections.
 * @param size - Number of avatars per section.
 * @returns An array of avatar sections, where each section is an array of avatars.
 */
const chunkAvatars = (avatars: Avatar[], size: number): Avatar[][] =>
  Array.from({ length: Math.ceil(avatars.length / size) }, (_, i) => avatars.slice(i * size, i * size + size));

export const ChoiceAvatar = () => {
  const sections = chunkAvatars(AVATARS, AVATARS_PER_SECTION);
  const selectAvatar = useOvaStore((state) => state.selectAvatar);
  const selectedAvatarId = useOvaStore((state) => state.selectedAvatarId);

  return (
    <Content withOutTitle>
      <p className={css['instruction']}>
        Selecciona un avatar para el transcurso del OVA. Puedes cambiarlo en cualquier momento. Una vez que selecciones
        un avatar, presiona el botón <strong>Menú</strong> para continuar.
      </p>

      <Panel>
        {sections.map((group, sectionIndex) => (
          <Panel.Section key={sectionIndex}>
            <div className={css['panel']}>
              <div className={cn(css['panel__content'], 'u-wrapper')}>
                <Panel.Button section={sectionIndex - 1}>
                  <button className={css['panel__navigation-button']} disabled={sectionIndex === 0}>
                    <Icon>
                      <ChevronsLeft />
                    </Icon>
                    <span className="u-sr-only">Anterior</span>
                  </button>
                </Panel.Button>
                <ul className={css['avatar-list']}>
                  {group.map((avatar) => (
                    <li key={avatar.id} className={css['avatar-item']}>
                      <img
                        src={`assets/base/avatars/${avatar.id}/${avatar.name}-${AvatarVariation.GREETING}.webp`}
                        alt={avatar.name}
                        className={css['avatar-image']}
                      />
                      <Button
                        label={selectedAvatarId === avatar.id ? 'Seleccionado' : 'Seleccionar'}
                        disabled={selectedAvatarId === avatar.id}
                        onClick={() => selectAvatar(avatar.id)}
                      />
                    </li>
                  ))}
                </ul>
                <Panel.Button section={sectionIndex + 1}>
                  <button className={css['panel__navigation-button']} disabled={sectionIndex === sections.length - 1}>
                    <Icon>
                      <ChevronsRight />
                    </Icon>
                    <span className="u-sr-only">Siguiente</span>
                  </button>
                </Panel.Button>
              </div>
            </div>
          </Panel.Section>
        ))}
      </Panel>
    </Content>
  );
};
