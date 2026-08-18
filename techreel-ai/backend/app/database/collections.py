from typing import Any
from app.database.mongodb import db_manager

def get_users_collection() -> Any:
    return db_manager.get_collection("users")

def get_reels_collection() -> Any:
    return db_manager.get_collection("reels")

def get_interactions_collection() -> Any:
    return db_manager.get_collection("interactions")

def get_interest_profiles_collection() -> Any:
    return db_manager.get_collection("interest_profiles")

def get_interest_graphs_collection() -> Any:
    return db_manager.get_collection("interest_graphs")

def get_content_analysis_collection() -> Any:
    return db_manager.get_collection("content_analysis")

def get_recommendations_collection() -> Any:
    return db_manager.get_collection("recommendations")

def get_feedback_collection() -> Any:
    return db_manager.get_collection("feedback")

def get_learning_paths_collection() -> Any:
    return db_manager.get_collection("learning_paths")

def get_quiz_results_collection() -> Any:
    return db_manager.get_collection("quiz_results")
