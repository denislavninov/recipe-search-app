import { createContext, useReducer, useContext, Dispatch } from "react";
import { Recipe } from "./models/recipe";

export const RECIPE_ACTIONS = {
  update: "update",
  deleteAll: "delete_all",
};

type Action = {
  type: string;
  payload?: Recipe[];
};

export const RecipesContext = createContext<Recipe[]>([]);
export const RecipesDispatchContext = createContext<Dispatch<Action>>(() => { });

export const RecipesProvider = ({ children, initialState }: { children: React.ReactNode; initialState: Recipe[] }) => {
  const [recipes, dispatch] = useReducer(userReducer, initialState ?? []);

  return (
    <RecipesContext.Provider value={recipes}>
      <RecipesDispatchContext.Provider value={dispatch}>
        {children}
      </RecipesDispatchContext.Provider>
    </RecipesContext.Provider>
  );
};

function userReducer(state: Recipe[], action: Action): Recipe[] {
  switch (action.type) {
    case RECIPE_ACTIONS.update: {
      console.log("Incoming action", action, state);
      const newRecipes = action.payload?.filter(
        (payloadItem) =>
          !state.some((recipe) => recipe.idMeal === payloadItem.idMeal),
      ) || [];

      return [...newRecipes, ...state];
    }
    case RECIPE_ACTIONS.deleteAll: {
      return [];
    }

    default:
      throw Error(`Action type ${action.type} is not supported`);
  }
}

export const useRecipes = () => useContext(RecipesContext);
export const useRecipesDispatch = () => useContext(RecipesDispatchContext);
