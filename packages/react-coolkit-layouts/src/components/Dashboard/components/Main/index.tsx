import { Components } from './components';
import { IMainProps } from './types';

export const Main = (props: IMainProps) => {
	const { route, children } = props;
	const { footer, contentProps } = route.layout?.config ?? {};
	const header = route.metadata?.title;

	return (
		<Components.Wrapper id="layout-main">
			{header
				? (
						<Components.Header id="page-header">
							{header}
						</Components.Header>
					)
				: null
			}
			<Components.Content {...contentProps} id="page-content">
				{children}
			</Components.Content>
			{footer
				? (
						<Components.Footer id="page-footer">
							{footer}
						</Components.Footer>
					)
				: null
			}
		</Components.Wrapper>
	);
};
